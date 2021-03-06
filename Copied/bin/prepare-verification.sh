#!/usr/bin/env bash

mkdir -p ./verification

function flatten {
  ./node_modules/.bin/truffle-flattener $1 | sed "s|$PWD|.|g" > $2
   echo "Source code prepared for" $1
}

flatten ./contracts/FlightDelayChainlink.sol ./verification/FlightDelayChainlink.txt
# flatten ./contracts/Acre.sol ./verification/FlightDelayEtheriscOracle.txt
# flatten ./contracts/FlightDelayMockup.sol ./verification/FlightDelayMockup.txt
