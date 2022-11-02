FROM public.ecr.aws/lambda/nodejs:16 as builder
WORKDIR /usr/app
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY build.js ./
RUN npx yarn install
COPY src ./src
RUN node build.js

FROM public.ecr.aws/lambda/nodejs:16
WORKDIR ${LAMBDA_TASK_ROOT}
COPY --from=builder /usr/app/dist/* ./
CMD ["index.handler"]