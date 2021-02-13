import {bind, BindingScope} from '@loopback/core';

@bind({
  scope: BindingScope.SINGLETON,
})
export class UserService {}
