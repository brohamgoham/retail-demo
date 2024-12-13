
## Documenting setup need for NCW operations

**This document outlines the challenges faced and the solutions implemented during the integration of the Fireblocks Non-Custodial Wallet (NCW) API and the Fireblocks SDK. The goal was to create functional endpoints for device management and wallet management within a retail demo application.**

---

## Key Challenges and Solutions
1. Challenge: 
    The initial hurdle was understanding the structure and functionality of the Fireblocks SDK NCW component. API documentation had uncertainties about the available methods and their required user role.
        example: https://developers.fireblocks.com/reference/getdevices


2. Implementing Device Management Endpoints
    Challenge: The initial implementation of the device management endpoints faced issues with API calls returning unexpected results or errors.
    Solution:
        Mocked the Fireblocks SDK methods during testing to isolate issues.
        Implemented detailed logging to capture the request and response   
        data for debugging.
        Adjusted the method calls based on the actual API responses and refined the parameters being passed.


## Services

1. **NCWService**: 
   - Handles Device & Key Managment 
   - Wallet managment 
   - Backup and Recovery managment
   

IDS for testing 
