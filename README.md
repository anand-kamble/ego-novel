# Ego Novel AI

https://github.com/user-attachments/assets/e2cbb666-a96b-4c1b-a525-07d58b8108fa


## Features
- Generate content using AI (Use OpenAI or Anthropic to generate the next sentence of a story)
- Translate you story into different languages using AI
- Save your stories in a database.
- User accounts can be created.
- dark/light themes in UI

## How to run the application
#### Prerequisites
- Python
- NodeJS
- Poetry

A `.env` file is needed to run the application which will be placed at the root. This file will contain the following:
```
SUPABASE_URL=https://fjcuthovlaqyfgksapyv.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqY3V0aG92bGFxeWZna3NhcHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMjc4NDgsImV4cCI6MjA0ODkwMzg0OH0.3wJGqmca0TFjxdwToYgn59PAx5VG3nue3WLco4pF0ho
OPENAI_API_KEY=<your-openai-key>
ANTHROPIC_API_KEY=<your-key>
```

Once you all of these ready, please follow the steps below:

1. Clone the repo
   ```bash
   git clone https://github.com/anand-kamble/ego-novel
   ```
2. Install python dependencies
   ```bash
   poetry install
   ```
3. Install NodeJS dependencies in frontend folder
   ```bash
   cd frontend
   yarn install
   ```
   if you don't have `yarn` you can install it by `npm i -g yarn`
4. To start the backend we will need poetry enviroment to activate the poetry env
   ```bash
   cd .. # Coming back to the root of the project
   poetry shell
   ```
5. Once the enviroment is active
   ```bash
   bash start.sh
   ```

## Tool/Frameworks Used
- Backend
   - FastAPI
   - Langgraph
   - Supabase
   - uuid
- Frontend
  - ReactJS with TypeScript
  - Redux
  - RadixUI
  - Axios
- Project Management
  - Linear
  - GitHub
  - Commitizen


## Project details
### AI
To generate the completions for the story, I have used langgraph. I have used `StateGraph` for this application, which has memory. I have previosly worked with llama-index workflows and found it very similar to langgraph.  
I am using two different graphs in the project since Anthropic does not allow more than one system prompt. I my application for OpenAI I am adding system message when generating the next sentence, I did that to prevent the model going off track as I am using GPT 3.5.  
Currently, I am adding the story directly into the prompt but there are more sophisticated ways of doing that such as RAG that will be useful when adding large documents.  

I did try using the `PostgresSaver` for memory but I was not able to successfully connect it to the supabase database. So I ended up using `MemorySaver` which store the checkpoints in memory.  

Furthermore, I would like to talk about the `tools` that can be added into langgraph which are the functions that can be called by the LLM, I do wanted to use those but could not find a suitable use for that. But I would love to implement those in the graph as well.
This AI predictions can be improved a lot by using better Prompt Formats and storing the generated messeges and using those in the LLMChain for completions.

### Backend  
The backend is divided into multiple routers, I did so it is easiar to scale the application and makes it easy to manage. I used `FastAPI` for the APIs and `Supabase` for connecting to database. I have not implemented the Authentication methods like OAuth etc. as it will need more time.  
In some function I have defined the types since I was running out of time.

### Frontend 
I have used ReactJS with TypeScript and implemented the necessary tools like Router, Redux, i18n and Radix. I have implemented all the API calls through Redux which is the best practice as per I am aware of. There are a lot more functions that need to be implemented like email pattern validation, loading screens, Error Toasts and a lot more. But due to time contraints I have not done that yet. 

### Project Setup
I am using Poetry for package management in Python and Yarn in Node. I have also added commitizen into the project to keep the commit messages in a standard format.  
Also, I did use Linear to manage the project by splitting it into tasks and also did make different github branches for feature and then merged those using Pull Requests.

### Database
For database I am using Supabase, where I have created tables with appropiate columns. I am using supabase python package to interact with it.
