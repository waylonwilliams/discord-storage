FROM node:18

WORKDIR /bot

COPY . /bot

# RUN npm install -g typescript
RUN npm install

RUN mkdir uploaded

CMD ["npm", "run", "start"] 