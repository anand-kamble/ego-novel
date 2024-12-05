from dotenv import load_dotenv
from typing import Annotated, Literal
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_core.messages import BaseMessage
from typing_extensions import TypedDict
from langchain_core.tools import tool
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode, tools_condition
from langgraph.checkpoint.memory import MemorySaver


load_dotenv("../.env")

memory = MemorySaver()

class State(TypedDict):
    messages: Annotated[list, add_messages]



llmOpenAI = ChatOpenAI(model="gpt-3.5-turbo")
llmAnthropic = ChatAnthropic(model_name="claude-3-haiku-20240307",timeout=60)

def chatbot_openai(state: State):
    return {"messages": [llmOpenAI.invoke(state["messages"])]}

def chatbot_anthropic(state: State):
    return {"messages": [llmAnthropic.invoke(state["messages"])]}

graph_builder_openai = StateGraph(State)
graph_builder_openai.add_node("chatbot", chatbot_openai)
graph_builder_openai.add_conditional_edges(
    "chatbot",
    tools_condition,
)
graph_builder_openai.add_edge(START, "chatbot")
graph_openai = graph_builder_openai.compile(checkpointer=memory)


graph_builder_anthropic = StateGraph(State)
graph_builder_anthropic.add_node("chatbot", chatbot_anthropic)
graph_builder_anthropic.add_conditional_edges(
    "chatbot",
    tools_condition,
)
graph_builder_anthropic.add_edge(START, "chatbot")
graph_anthropic = graph_builder_anthropic.compile(checkpointer=memory)
       
last_thread_id = None

def generate_next_sentence(thread_id: str, story_content: str, title: str, model:str):
    global last_thread_id
    print("Generating next sentence using", model)
    contents = []
    if model == "openai":
        inputs = {"messages": [
            ("system",f"You are an assistant helping a writer write a story titled '{title}'. You don't ask questions, you just write the next sentence. Do not write what is already written."),
            ("human", story_content),
            ("human", "please write the next sentence for me.")
            ]
                }
        events = graph_openai.stream(
            inputs, {"configurable": {"thread_id": thread_id}}, stream_mode="values"
        ) 
        for event in events:
            contents.append(event["messages"][-1].content)

    elif model == "anthropic":
        messages = []
        
        messages.append(("human",f"You are an assistant helping a writer write a story titled '{title}'. You don't ask questions, you just write the next sentence. Do not write what is already written."))
        messages.append(("human", story_content))
        messages.append(("human", "please write the next sentence for me."))
        
        inputs = {"messages": messages}
        
        events = graph_anthropic.stream(
            inputs, {"configurable": {"thread_id": thread_id}}, stream_mode="values"
        ) 
        for event in events:
            contents.append(str(event["messages"][-1].content).replace(story_content, ""))

    
    return " " + contents[-1] + " "



def translate(content:str, model:str, language:str):
    if model == "openai":
        messages = [
            (
                "system",
                f"You are a helpful assistant that translates English to {language}. Translate the user content.",
            ),
            ("human", content),
        ]
        ai_msg = llmOpenAI.invoke(messages)
        return ai_msg.content
    elif model == "anthropic":
        messages = [
            (
                "system",
                f"You are a helpful assistant that translates English to {language}. Translate the user content.",
            ),
            ("human", content),
        ]
        ai_msg = llmAnthropic.invoke(messages)
        return ai_msg.content