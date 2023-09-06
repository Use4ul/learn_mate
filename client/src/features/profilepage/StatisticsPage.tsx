import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/store';
import { loadCardStat, loadModulesForUserStat, loadgroupStat } from './profileSlice';

function StatisticsPage(): React.JSX.Element {
  const { userId } = useParams();
  const modules = useSelector((store: RootState) => store.profile.modulesForStat);
  const cardsProgress = useSelector((store: RootState) => store.profile.cardsProgress);
  const groupProgress = useSelector((store: RootState) => store.profile.groupProgess);
  const user = useSelector((store: RootState) => store.auth.authUser);

  const [page, setPage] = useState('common');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadModulesForUserStat(Number(userId)));
    dispatch(loadCardStat(Number(userId)));
    dispatch(loadgroupStat(Number(userId)));
  }, []);

  return (
    <div>
      <button type="button" onClick={() => setPage('common')}>
        Общая статистика
      </button>
      {user?.role_id === 1 && (
        <button type="button" onClick={() => setPage('group')}>
          Статистика по классам
        </button>
      )}

      {page === 'common' ? (
        <div>
          {Boolean(modules.length) &&
            modules.map((module) => (
              <>
                <div>{`Модуль - ${module.title}`}</div>
                {module.Cards.map((card) => (
                  <div className="card__container">
                    <div>{card.term}</div>
                    <div>{card.definition}</div>
                    {Boolean(cardsProgress.length) && (
                      <div>
                        {`Правильных ответов по карточке: ${
                          cardsProgress.filter((el) => el.card_id === card.id)[0].progress
                        }%`}
                      </div>
                    )}
                  </div>
                ))}
              </>
            ))}
        </div>
      ) : (
        <>
          <div>Статистика по группам</div>
          <div>
            {Boolean(groupProgress.length) &&
              groupProgress.map((group) => (
                <>
                  <div>{group.title}</div>
                  <div>
                    {group.result.length ? group.result.map((el) => (
                      <div>{`${el.nickname} - ${el.progress}%`}</div>
                    )) : <div>{`Отсутствуют результаты в группе ${group.title}`}</div>}
                  </div>
                </>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default StatisticsPage;
