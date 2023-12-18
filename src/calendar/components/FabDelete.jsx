import { useCalendarStore, useUiStore } from "../../hooks"

export const FabDelete = () => {

    const { isDateModalOpen } = useUiStore();
    const { startDeleteEvent, hasEventSelected } = useCalendarStore();

    const handleDelete = () => {
      startDeleteEvent();
    };

  return (
    <button
        className="btn btn-danger fab-danger"
        onClick={ handleDelete }
        style={{
          display: hasEventSelected && !isDateModalOpen ? '' : 'none'
        }}
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
