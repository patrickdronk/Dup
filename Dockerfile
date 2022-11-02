FROM public.ecr.aws/lambda/nodejs:16 as builder
WORKDIR /usr/app
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY build.js ./
COPY src ./src
RUN npx yarn install
RUN node build.js

FROM public.ecr.aws/lambda/nodejs:16
WORKDIR ${LAMBDA_TASK_ROOT}
COPY --from=builder /usr/app/dist/* ./
CMD ["index.work"]