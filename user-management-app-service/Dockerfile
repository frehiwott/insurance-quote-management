
# import node
FROM node:16-alpine

# specify working directory
WORKDIR /user-managment

# copy package related files
COPY package.json .
RUN npm i

# copies the entire source in to server
COPY . .

# specify the port to expose
EXPOSE 8000

# Run the below command after the above step is completed
CMD ["npm","start"]