import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { Colors } from 'appConstants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      titleColor: Colors.TEXT_COLOR_BLUE,
      bodyColor: Colors.TEXT_COLOR_BLUE,
      backgroundColor: Colors.WHITE,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: Colors.GRAY,
      padding: 12,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: Colors.TEXT_COLOR,
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
        max: 100,
        stepSize: 25,
        color: Colors.TEXT_COLOR,
      },
    },
  },
};

export const ChartBar = ({
  total,
  personal,
  referral,
}: {
  total: number[],
  personal: number[],
  referral: number[],
}) => {
  const { t } = useTranslation('main');
  const trans = useTranslation('partner').t;
  const labels = [
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
  ];

  return (
    <Bar
      options={options}
      data={{
        labels,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        datasets: [
          {
            label: trans('Total_profit_bonus_'),
            data: total,
            backgroundColor: 'rgba(102, 115, 189, 1)',
            borderRadius: 2,
            barThickness: 8,
          },
          {
            label: trans('Personal_profit_'),
            data: personal,
            backgroundColor: 'rgba(249, 143, 99, 1)',
            borderRadius: 2,
            barThickness: 8,

          },
          {
            label: trans('Profit_from_referrals_'),
            data: referral,
            backgroundColor: 'rgba(5, 22, 85, 1)',
            borderRadius: 2,
            barThickness: 8,
          },
        ],
      }}
    />
  );
};
