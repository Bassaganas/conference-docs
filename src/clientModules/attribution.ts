// Records the first touch of the session (src/utils/attribution.ts) on whichever page a visitor
// lands, not only on the home page that shows the sign-up form. Client modules are also loaded
// during the build's server render, where there is no window, hence the guard.
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { currentAttribution } from '../utils/attribution';

if (ExecutionEnvironment.canUseDOM) {
  currentAttribution();
}
