import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'http://localhost:9000',
        baseUrl: 'https://todo-app-server-lws.herokuapp.com',
    }),
    // tagTypes: ['todos'],
    endpoints: (builder) => ({
        // get all the Todos
        getTodos: builder.query({
            query: () => '/todos', // locahost:9000/todos = fetch all videos
            providesTags: ['todos'],
        }),

        // add new Todo
        addTodo: builder.mutation({
            query: (newTodo) => ({
                url: '/todos',
                method: 'POST',
                body: newTodo,
            }),
            invalidatesTags: ['todos'],
        }),

        // edit todo
        editTodo: builder.mutation({
            query: ({ id, updatedTodo }) => ({
                url: `/todos/${id}`,
                method: 'PATCH',
                body: updatedTodo,
            }),
            invalidatesTags: ['todos'],
        }),

        // delete todos
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['todos'],
        }),
    }),
});

export const { useGetTodosQuery, useAddTodoMutation, useEditTodoMutation, useDeleteTodoMutation } =
    apiSlice;
