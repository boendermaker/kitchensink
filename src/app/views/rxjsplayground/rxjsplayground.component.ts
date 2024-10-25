import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { combineLatest, delay, first, forkJoin, interval, map, mergeMap, of, share, shareReplay, switchMap, take, timer } from 'rxjs';
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

  code = null;

  constructor(
    private http: HttpClient
  ) {
    this.switchMapRequests();
    this.forkJoinRequests();
    this.getPostsByUser();
    this.getPostsByUserWithInterval();
    this.getPostsAndTodosByUser();
    this.getPostsAndTodosByUserAndCommentsByPost();
    this.combineLatestRequests();
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

  switchMapRequests() {
    const data = {
      users: [],
      posts: [],
      todos: []
    }
    this.getPlaceholderUsers().pipe(

      switchMap((users: IUser[]) => {
        data.users = users;
        return this.getPlaceholderPosts('');
      }),

      switchMap((posts: any[]) => {
        data.posts = posts;
        return this.getPlaceholderTodos('');
      }),

      map((todos: any[]) => {
        data.todos = todos;
        return data;
      })

    ).subscribe((data) => this.code += `SwitchMap -> User: entries${data.users.length}, Posts: entries${data.posts.length}, Todos: entries${data.todos.length}\n`);
  }

//##########################################

  forkJoinRequests() {

    return forkJoin({
        users: this.getPlaceholderUsers(),
        posts: this.getPlaceholderPosts('1'),
        todos: this.getPlaceholderTodos('1')
      })
      .subscribe((data) => this.code += `forkJoin -> User: entries${data.users.length}, Posts: entries${data.posts.length}, Todos: entries${data.todos.length}\n`);

  }

//##########################################

  combineLatestRequests() {

    return combineLatest({
        users: this.getPlaceholderUsers(),
        posts: this.getPlaceholderPosts('1').pipe(delay(3000)),
        todos: this.getPlaceholderTodos('1')
      })
      .subscribe((data) => this.code += `combineLatest -> User: entries${data.users.length}, Posts: entries${data.posts.length}, Todos: entries${data.todos.length}\n`);

  }


//##########################################

  getPostsByUser(): void {
    this.getPlaceholderUsers().pipe(

      switchMap((users: IUser[]) => {

        return combineLatest(

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

  getPostsByUserWithInterval(): void {
    this.getPlaceholderUsers().pipe(

      switchMap((users: IUser[]) => {

        return forkJoin(

          users.map((user) => forkJoin({
            loop: interval(1000).pipe(take(10), map(() => user.id)),
            posts: this.getPlaceholderPosts(user.id),
            todos: this.getPlaceholderTodos(user.id)
          }).pipe(

            map(({loop, posts, todos}) => {
              return { loop, posts, todos };
            })

          ))

        )

      })

    )
    .subscribe((data) => data.forEach(({ loop, posts, todos }) => this.code += `User: ${loop} - Posts: entries${posts.length}, Todos: entries${todos.length}\n`))
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
