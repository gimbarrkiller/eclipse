import React, {
  useRef, useEffect, useState, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import type { ChartData, ChartArea, ScriptableContext } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  registerables,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

import { Colors } from 'appConstants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  ...registerables,
);

const createGradient = (ctx: CanvasRenderingContext2D, area: ChartArea) => {
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, Colors.BLUE);
  gradient.addColorStop(1, Colors.VIOLET_LIGHT);

  return gradient;
};

const styles = {
  chart: {
    height: '340px',
  },
};

export const ChartLine = ({ dataLvl }: { dataLvl: number[] }) => {
  const { t } = useTranslation('main');

  const labels = useMemo(() => ([
    t('Jan_'),
    t('Feb_'),
    t('Mar_'),
    t('Apr_'),
    t('May_'),
    t('Jun_'),
    t('Jul_'),
    t('Aug_'),
    t('Sep_'),
    t('Oct_'),
    t('Nov_'),
    t('Dec_'),
  ]), [t]);

  const data = useMemo(() => ({
    labels,
    datasets: [
      {
        fill: true,
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const { ctx } = context.chart;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(61,142,254,0.5)');
          gradient.addColorStop(1, 'rgba(61, 142, 254, 0)');
          return gradient;
        },
      },
    ],
  }), [labels]);

  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const chartDataObj = {
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        borderColor: createGradient(chart.ctx, chart.chartArea),
        data: dataLvl,
      })),
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setChartData(chartDataObj);
  }, [dataLvl, data]);

  return (
    <Chart
      ref={chartRef}
      type="line"
      data={chartData}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: Colors.TEXT_COLOR,
              font: {
                size: 12,
                weight: 500,
              },
            },
            border: {
              color: Colors.GRAY,
            },
          },
          y: {
            grid: {
              drawTicks: false,
              color: Colors.GRAY,
            },
            border: {
              display: false,
            },
            ticks: {
              min: 0,
              max: 3,
              stepSize: 1,
              color: Colors.TEXT_COLOR,
              crossAlign: 'center',
              font: {
                size: 12,
                weight: 500,
              },
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              callback: (value: number) => {
                switch (value) {
                  case 0:
                    return t('seller');
                  case 1:
                    return t('advanced_seller');
                  case 2:
                    return t('premium_seller');
                  case 3:
                    return t('top_seller');
                  default:
                    return value;
                }
              },
            },
          },
        },
      }}
      style={styles.chart}
    />
  );
};
