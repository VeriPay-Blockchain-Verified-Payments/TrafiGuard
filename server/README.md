# Receive Kit

Easily receive, validate, and further process data from [share-kit](https://github.com/hellobloom/share-kit).

# Summary

Receive-kit implements a single HTTP POST handler endpoint at `/api/receive`. Requests should contain a JSON body structured like the `ResponseData` documented in share-kit. Assuming the request structure if valid, the handler then performs the following validations:

- Basic off-chain data:
  - Validate the shared subject ethereum address matches the address recovered based on the shared packedData and signature.
  - Validate that we're able to recreate the shared packedData value by hashing the JSON representation of the shared data and token.
- Per node off-chain data:
  - Validate the hash of the shared rootHash and rootHashNonce matches the shared layer2Hash.
  - Validate the shared attester ethereum address matches the address recovered based on the hash of the shared attestation node and its signature.
  - Validate the merkle proof.
- On-chain data:
  - Validate the shared data hash matches the hash that is on-chain for the shared transaction hash.
  - Validate the shared subject ethereum address matches the address that is on-chain for the shared transaction hash.
  - Validate the shared attester ethereum address matches the address that is on-chain for the shared transaction hash.

# Try it out

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
