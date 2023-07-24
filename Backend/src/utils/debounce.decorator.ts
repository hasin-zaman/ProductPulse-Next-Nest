import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Debounce = (time: number): any => {
  return createParamDecorator(
    (data: unknown, ctx: ExecutionContext): Promise<any> => {
      const request = ctx.switchToHttp().getRequest();
      return new Promise((resolve) => {
        setTimeout(() => resolve(request), time);
      });
    },
  );
};
