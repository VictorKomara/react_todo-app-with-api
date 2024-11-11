/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { useState } from 'react';
import { FormEditingTitle } from './FormEditingTitle';

type Props = {
  visibleTodos: Todo[];
  removeTodo: (todoId: number) => void;
  tempTodo: string;
  updatingAndDeletingCompletedTodos: Todo[] | [];
  setUpdatingAndDeletingCompletedTodos: (
    deletingCompletedTodos: Todo[] | [],
  ) => void;
  changeTodo: (todo: Todo) => void;
  editingTitle: number;
  setEditingTitle: (editingTitle: number) => void;
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  removeTodo,
  tempTodo,
  updatingAndDeletingCompletedTodos,
  setUpdatingAndDeletingCompletedTodos,
  changeTodo,
  editingTitle,
  setEditingTitle,
}) => {
  const [titleEdit, setTitleEdit] = useState<string>('');

  function deleteTodo(todo: Todo) {
    removeTodo(todo.id);
    setUpdatingAndDeletingCompletedTodos([todo]);
  }

  function handleChangeSubmit(todo: Todo) {
    if (todo.title === titleEdit) {
      setEditingTitle(0);

      return;
    }

    if (!titleEdit) {
      deleteTodo(todo);

      return;
    }

    changeTodo({ ...todo, title: titleEdit.trim() });
    setUpdatingAndDeletingCompletedTodos([todo]);
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => {
        const { id, completed, title } = todo;

        return (
          <div
            data-cy="Todo"
            className={classNames('todo', { completed: completed })}
            key={id}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={completed}
                onClick={() => {
                  changeTodo({ ...todo, completed: !completed });
                  setUpdatingAndDeletingCompletedTodos([todo]);
                }}
              />
            </label>

            {editingTitle === id ? (
              <FormEditingTitle
                todo={todo}
                titleEdit={titleEdit}
                setTitleEdit={setTitleEdit}
                handleChangeSubmit={handleChangeSubmit}
                setEditingTitle={setEditingTitle}
              />
            ) : (
              <>
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onDoubleClick={() => {
                    setEditingTitle(id);
                    setTitleEdit(title);
                  }}
                >
                  {title}
                </span>

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => deleteTodo(todo)}
                >
                  x
                </button>
              </>
            )}

            {/* overlay will cover the todo while it is being deleted or updated */}
            <div
              data-cy="TodoLoader"
              className={classNames('modal', 'overlay', {
                'is-active': updatingAndDeletingCompletedTodos?.some(
                  task => task.id === todo.id,
                ),
              })}
            >
              <div
                className={classNames(
                  'modal-background',
                  'has-background-white-ter',
                )}
              />
              <div className="loader" />
            </div>
          </div>
        );
      })}

      {tempTodo && (
        <div data-cy="Todo" className="todo">
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {tempTodo}
          </span>

          {/* Remove button appears only on hover */}
          <button type="button" className="todo__remove" data-cy="TodoDelete">
            x
          </button>

          {/* overlay will cover the todo while it is being deleted or updated */}
          <div data-cy="TodoLoader" className="modal overlay is-active">
            <div
              className={classNames(
                'modal-background',
                'has-background-white-ter',
              )}
            />
            <div className="loader" />
          </div>
        </div>
      )}
    </section>
  );
};
