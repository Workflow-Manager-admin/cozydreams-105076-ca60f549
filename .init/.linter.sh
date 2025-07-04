#!/bin/bash
cd /home/kavia/workspace/code-generation/cozydreams-105076-ca60f549/frontend_web_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

