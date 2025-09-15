import requests
from typing import Any

from cachetools import cached, TTLCache

class PublicService:
  _instance = None
  public_service_url: str

  def __new__(cls, public_service_url: str):
    if cls._instance is None:
      cls._instance = super().__new__(cls)
      cls._instance.public_service_url = public_service_url
    return cls._instance
  
  def __init__(self, public_service_url: str):
    pass

  @cached(cache=TTLCache(maxsize=100, ttl=600))
  def getPublicFile(self, fileUrl: str):
    """
    Pass `fileUrl` with the slash at the beginning, for examle `/labels/en.json`
    """
    response = requests.get(self.public_service_url + fileUrl)
    try:
      return response.json()
    except ValueError:
      return None
