import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';

export interface PublicDashboardFooterCfg {
  hide: boolean;
  text: React.ReactNode;
  logo: string;
  link: string;
}

export const PublicDashboardFooter = function () {
  const styles = useStyles2(getStyles);
  const conf = useGetPublicDashboardFooterConfig();

  return conf.hide ? null : (
    <div className={styles.footer}>
      <a className={styles.link} href={conf.link} target="_blank" rel="noreferrer noopener">
        {conf.text} <img className={styles.logoImg} alt="" src={conf.logo} />
      </a>
    </div>
  );
};

export function setPublicDashboardFooterConfigFn(fn: typeof useGetPublicDashboardFooterConfig) {
  useGetPublicDashboardFooterConfig = fn;
}
export let useGetPublicDashboardFooterConfig = (): PublicDashboardFooterCfg => {
  const styles = useStyles2(getStyles);

  return {
    hide: false,
    text: (
      <p className={styles.textContainer}>
        Powered by <img className={styles.logoImg} alt="grafana-logo" src="public/img/grafana_icon.svg" /> Grafana
      </p>
    ),
    logo: '',
    link: 'https://grafana.com/',
  };
};

const getStyles = (theme: GrafanaTheme2) => ({
  footer: css`
    display: flex;
    justify-content: end;
    height: 30px;
    padding: ${theme.spacing(0, 2, 0, 1)};
  `,
  link: css`
    display: flex;
    gap: 4px;
    justify-content: end;
    align-items: center;
  `,
  textContainer: css`
    height: 100%;
  `,
  logoImg: css`
    height: 100%;
    padding: ${theme.spacing(0.25, 0, 0.5, 0)};
  `,
});
