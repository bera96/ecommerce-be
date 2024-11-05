FROM node:18-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm config set registry https://registry.npmjs.org/
RUN npm config set fetch-timeout 600000
RUN npm config set fetch-retries 5

RUN npm install

COPY . .

RUN npm run test || exit 1

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

EXPOSE 4175

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4175"]