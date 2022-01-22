#!/bin/bash
THIS_DIR=$(pwd)
export GOOGLE_APPLICATION_CREDENTIALS="${THIS_DIR}/scripts/security/general-sand-box-key-e1d8290db23e.json"
export TEST_ENV="variable-defined-by-set-env"

echo GOOGLE_APPLICATION_CREDENTIALS = $GOOGLE_APPLICATION_CREDENTIALS
echo Enjoy your conding session