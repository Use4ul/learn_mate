import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/store';
import { loadModulesForUserStat } from './profileSlice';

function StatisticsPage(): React.JSX.Element {
  const { userId } = useParams();
  const modules = useSelector((store: RootState) => store.profile.modulesForStat);
  console.log(modules);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadModulesForUserStat(Number(userId)));
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
                {/* <div>{`Правильных ответов по карточке: ${progress}%`}</div> */}
              </div>
            ))}
          </>
        ))}
    </div>
  );
}

export default StatisticsPage;
