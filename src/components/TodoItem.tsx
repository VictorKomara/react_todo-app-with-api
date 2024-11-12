/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { FormEditingTitle } from './FormEditingTitle';

type Props = {
  todo: Todo;
  changeTodo: (todo: Todo) => void;
  updatingAndDeletingCompletedTodos: Todo[] | [];
  setUpdatingAndDeletingCompletedTodos: (
    deletingCompletedTodos: Todo[] | [],
  ) => void;
  editingTitle: number;
  setEditingTitle: (editingTitle: number) => void;
  titleEdit: string;
  setTitleEdit: (titleEdit: string) => void;
  handleChangeSubmit: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  changeTodo,
  updatingAndDeletingCompletedTodos,
  setUpdatingAndDeletingCompletedTodos,
  editingTitle,
  setEditingTitle,
  titleEdit,
  setTitleEdit,
  handleChangeSubmit,
  deleteTodo,
}) => {
  const { id, completed, title } = todo;

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
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

      <div
        data-cy="TodoLoader"
        className={classNames('modal', 'overlay', {
          'is-active': updatingAndDeletingCompletedTodos?.some(
            task => task.id === todo.id,
          ),
        })}
      >
        <div
          className={classNames('modal-background', 'has-background-white-ter')}
        />
        <div className="loader" />
      </div>
    </div>
  );
};
