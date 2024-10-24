FROM node:20.11.0

RUN npm install -g nodemon
#Create working directory named app
WORKDIR /index.js

#copy all deendencies
COPY package*.json ./

#install dependencies
RUN npm install

#Copy all application source code ad file sto working directory
COPY . .

#Exposing the container to run on this port
EXPOSE 3200
EXPOSE 14074

#Command to run container for the back end server
CMD ["npm", "start"]
