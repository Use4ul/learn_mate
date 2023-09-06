import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/store';
import { loadCardStat, loadModulesForUserStat } from './profileSlice';

function StatisticsPage(): React.JSX.Element {
  const { userId } = useParams();
  const modules = useSelector((store: RootState) => store.profile.modulesForStat);
  const cardsProgress = useSelector((store: RootState) => store.profile.cardsProgress);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadModulesForUserStat(Number(userId)));
    dispatch(loadCardStat(Number(userId)));
  }, []);

  return (
    <div>
      {Boolean(modules.length) &&
        modules.map((module) => (
          <>
            <div>{module.title}</div>
            {module.Cards.map((card) => (
              <div className="card__container">
                <div>{card.term}</div>
                <div>{card.definition}</div>
                {Boolean(cardsProgress.length) && (
                  <div>{`Правильных ответов по карточке: ${
                    cardsProgress.filter((el) => el.card_id === card.id)[0].progress
                  }%`}
                  </div>
                )}
              </div>
            ))}
          </>
        ))}
    </div>
  );
}

export default StatisticsPage;
