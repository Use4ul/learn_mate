import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/store';
import { loadCardStat, loadModulesForUserStat, loadgroupStat } from './profileSlice';
import './styles/style.scss';

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
    <div className="stasistics__container">
      <div className="stasistics__button">
        <button type="button" onClick={() => setPage('common')}>
          Общая статистика
        </button>
        {user?.role_id === 1 && (
          <button type="button" onClick={() => setPage('group')}>
            Статистика по классам
          </button>
        )}
      </div>
      <div className="stasistics__modules">
        {page === 'common' ? (
          <div>
            {Boolean(modules.length) &&
              modules.map((module) => (
                <div className="stasistics__moduleOne">
                  <div className="stasistics__moduleTitle">{`Модуль - ${module.title}`}</div>
                  {module.Cards.map((card) => (
                    <div className="stasistics__cards">
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
                </div>
              ))}
          </div>
        ) : (
          <div className="stasistics__groups">
            <div className="stasistics__groupsH2">Статистика по группам</div>
            <div className="stasistics__groups">
              {Boolean(groupProgress.length) &&
                groupProgress.map((group) => (
                  <div className="stasistics__groupsOne">
                    <div>{group.title}</div>
                    <div>
                      {group.result.length ? (
                        group.result.map((el) => <div>{`${el.nickname} - ${el.progress}%`}</div>)
                      ) : (
                        <div className="stasistics__groupsOneNo">{`Отсутствуют результаты в группе ${group.title}`}</div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatisticsPage;
