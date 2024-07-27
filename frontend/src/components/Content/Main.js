import React from 'react';
import './Main.css';
import ChartInsightsByYear from '../Charts/ChartInsightsByYear';
import ChartIntensityLikelihood from '../Charts/ChartIntensityLikelihood';
import ChartPESTInsights from '../Charts/ChartPESTInsights';
import ChartRegionInsights from '../Charts/ChartRegionInsights';
import ChartSectorInsights from '../Charts/ChartSectorInsights';
import ChartRelevanceCountry from '../Charts/ChartRelevanceCountry';
import ChartTopicDistribution from '../Charts/ChartTopicDistribution';


const Main = () => {
  return (
    <div>
      <div className="main-content-holder">
        <div className="content-grid-one">
          <ChartInsightsByYear />
          <ChartIntensityLikelihood />
          <ChartPESTInsights />
        </div>
        <div className="content-grid-two">
          <ChartRegionInsights />
          <ChartRelevanceCountry />
        </div>
        <div className="content-grid-three">
          <ChartSectorInsights />
          <ChartTopicDistribution />
        </div>          
      </div>
    </div>
  );
}

export default Main;
