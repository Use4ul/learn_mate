import React, { useState } from 'react';

function GroupPage(): JSX.Element {
  const [newGroup, setNewGroup] = useState('');
  return (
    <div className="group__container">
      <div>
        <form>
          <input placeholder="введите название группы" value={newGroup} />
          <button type="submit"> Cоздать группу</button>
        </form>
      </div>
      <h5>добавить участников в группу</h5>
      <button type="button">Добавить(закинуть модалку) </button>
      <div>
        <div>имя студента</div>
        <button type="button"> удалить из группы</button>
      </div>
    </div>
  );
}

export default GroupPage;
