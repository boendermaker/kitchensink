import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { combineLatest, forkJoin, map, mergeMap, of, share, shareReplay, switchMap } from 'rxjs';
import { CodeviewerModule } from "../../components/codeviewer/codeviewer.module";

interface IUser {
  id: string;
}

@Component({
  selector: 'app-rxjsplayground',
  standalone: true,
  imports: [CodeviewerModule],
  templateUrl: './rxjsplayground.component.html',
  styleUrl: './rxjsplayground.component.scss'
})
export class RxjsplaygroundComponent {

  switchMapCode = null;
  forkJoinCode = null;
  combineLatestCode = null;

  constructor(
    private http: HttpClient
  ) {
    this.switchMapRequests();
    this.combineLatestRequests();
    this.forkJoinRequests();
    this.getPostsByUser();
    this.getPostsAndTodosByUser();
    this.getPostsAndTodosByUserAndCommentsByPost();
  }

//##########################################

  getPlaceholderUsers() {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users').pipe(shareReplay(1));
  }

  getPlaceholderPosts(userId: number | string) {
    return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).pipe(shareReplay(1));
  }

  getPlaceholderTodos(userId: number | string) {
    return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`).pipe(shareReplay(1));
  }

  getPlaceholderComments(postId: number | string) {
    return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`).pipe(shareReplay(1));
  }

//##########################################

  combineLatestRequests() {
    return this.getPlaceholderUsers().pipe(
      switchMap((users: IUser[]) => {
        return combineLatest({
          users: of(users),
          posts: this.getPlaceholderPosts('1'),
          todos: this.getPlaceholderTodos('1')
        })
      })
    ).subscribe((data) => console.log('COMBINE LATEST', this.combineLatestCode = `User: entries${data.users.length}, Posts: entries${data.posts.length}, Todos: entries${data.todos.length}`));
  }

//##########################################

  switchMapRequests() {
    const data = {
      users: [],
      posts: [],
      todos: []
    }
    this.getPlaceholderUsers().pipe(

      switchMap((users: IUser[]) => {
        data.users = users;
        return this.getPlaceholderPosts('1');
      }),

      switchMap((posts: any[]) => {
        data.posts = posts;
        return this.getPlaceholderTodos('1');
      }),

      map((todos: any[]) => {
        data.todos = todos;
        return data;
      })

    ).subscribe((data) => this.switchMapCode = `User: entries${data.users.length}, Posts: entries${data.posts.length}, Todos: entries${data.todos.length}`);
  }

//##########################################

  forkJoinRequests() {

    return forkJoin({
        users: this.getPlaceholderUsers(),
        posts: this.getPlaceholderPosts('1'),
        todos: this.getPlaceholderTodos('1')
      })
      .subscribe((data) => this.forkJoinCode = `User: entries${data.users.length}, Posts: entries${data.posts.length}, Todos: entries${data.todos.length}`);

  }

//##########################################

  getPostsByUser(): void {
    this.getPlaceholderUsers().pipe(

      switchMap((users: IUser[]) => {

        return forkJoin(

          users.map((user) => this.getPlaceholderPosts(user.id).pipe(

            map((posts: any[]) => {
              return { user, posts }
            })

          ))

        )

      })

    )
    .subscribe((data) => console.log(data))
  }

//##########################################

  getPostsAndTodosByUser(): void {
    this.getPlaceholderUsers().pipe(

      switchMap((users: IUser[]) => {

        return forkJoin(

          users.map((user) => forkJoin({
            posts: this.getPlaceholderPosts(user.id),
            todos: this.getPlaceholderTodos(user.id)
          }).pipe(

            map(({posts, todos}) => {
              return { user, posts, todos }
            })

          ))

        )

      })

    )
    .subscribe((data) => console.log(data))
  }

//##########################################

  getPostsAndTodosByUserAndCommentsByPost() {

    this.getPlaceholderUsers().pipe(

      switchMap((users: IUser[]) => {

        return forkJoin(

          users.map((user) => forkJoin({

            postscomplete: this.getPlaceholderPosts(user.id).pipe(
              switchMap((posts: any[]) => {
                return forkJoin(
                  posts.map((post) => this.getPlaceholderComments(post.id).pipe(
                    map((comments: any[]) => {
                      return { post, comments }
                    })
                  ))
                );
              })
            ),
            todos: this.getPlaceholderTodos(user.id)

          }).pipe(

            map(({postscomplete, todos}) => {
              return { user, postscomplete, todos }
            })

          ))

        )

      })

    )
    .subscribe((data) => console.log(data))

  }

//##########################################

}
