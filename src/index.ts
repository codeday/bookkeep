import { login } from './dataloaders/divvy';

(async () => {
  console.log(await login());
})();
