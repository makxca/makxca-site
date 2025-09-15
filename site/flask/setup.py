import json
from setuptools import setup

with open('package.json', 'r') as file:
  package = json.load(file)
  version = package['version']
  name = package['name']
  description = package['description']
  setup(
    name=name,
    version='3.0.0',
    description=description,
    author='makxca',
    packages=['static', 'templates'],
    install_requires=['build'],
  )
