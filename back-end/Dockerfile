FROM node:14

WORKDIR /bot

COPY . /bot

RUN npm install -g typescript
RUN npm install
RUN tsc

CMD ["node", "dist/App.js"] 