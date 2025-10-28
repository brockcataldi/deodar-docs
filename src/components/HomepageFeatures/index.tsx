import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

import ESBuildAndSass from '@site/static/img/es-build-and-sass.svg';
import ACF from '@site/static/img/acf.svg';
import Deodar from '@site/static/img/deodar.svg';


export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
        <div className={clsx('col col--4')}>
          <div className="text--center">
            <ACF className={styles.featureSvgACF} role="img" />
          </div>
          <div className="text--center padding-horiz--md">
            <Heading as="h3">ACF Pro Integration</Heading>
            <p>Build custom Gutenberg blocks with seamless Advanced Custom Fields Pro 
            integration. Create powerful, flexible content blocks without the complexity.</p>
          </div>
        </div>
        <div className={clsx('col col--4')}>
          <div className="text--center">
            <Deodar className={styles.featureSvgDeodar} role="img" />
          </div>
          <div className="text--center padding-horiz--md">
            <Heading as="h3">CLI-Powered Development</Heading>
            <p>Rapid development with our command-line tool. Generate blocks, manage builds, 
            and streamline your WordPress development workflow with simple commands.</p>
          </div>
        </div>
        <div className={clsx('col col--4')}>
          <div className="text--center">
            <ESBuildAndSass className={styles.featureSvgESBuildAndSass} role="img" />
          </div>
          <div className="text--center padding-horiz--md">
            <Heading as="h3">Modern Asset Management</Heading>
            <p>Rapid development with our command-line tool. Generate blocks, manage builds, 
            and streamline your WordPress development workflow with simple commands.</p>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
