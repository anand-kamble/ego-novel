#!/bin/bash

(cd frontend && yarn start) & (cd backend && fastapi run app.py)