from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate


# LangChain LLM configuration
llm = OpenAI(model="text-davinci-003", temperature=0.7)

# Define a prompt template
template = """
You are a greenhouse manager assistant. Based on the given sensor readings:
Temperature: {temperature}°C
Humidity: {humidity}%
Soil Moisture: {soil_moisture}%
Light Intensity: {light} lux

Provide actionable insights to maintain optimal plant growth. Consider user queries if provided.
"""

prompt = PromptTemplate(input_variables=["temperature", "humidity", "soil_moisture", "light"], template=template)
