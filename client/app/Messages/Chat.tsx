const chat = {
    id: 1,
    createdAt: "2023-05-17T10:00:00Z",
    updatedAt: "2023-05-17T10:05:00Z",
    listingId: 1,
    landlordId: 1,
    tenantId: 2,
};


const messageList = [
    {
        "id": 1,
        "content": "Hi, is the apartment still available?",
        "createdAt": "2023-05-17T10:01:00Z",
        "updatedAt": "2023-05-17T10:01:00Z",
        "chatId": 1,
        "authorId": 2
    },
    {
        "id": 2,
        "content": "Yes, it's still available. Would you like to schedule a viewing?",
        "createdAt": "2023-05-17T10:02:00Z",
        "updatedAt": "2023-05-17T10:02:00Z",
        "chatId": 1,
        "authorId": 1
    },
    {
        "id": 3,
        "content": "That sounds great. Can we arrange a viewing tomorrow?",
        "createdAt": "2023-05-17T10:03:00Z",
        "updatedAt": "2023-05-17T10:03:00Z",
        "chatId": 1,
        "authorId": 2
    },
    {
        "id": 4,
        "content": "Sure, what time works for you?",
        "createdAt": "2023-05-17T10:04:00Z",
        "updatedAt": "2023-05-17T10:04:00Z",
        "chatId": 1,
        "authorId": 1
    },
    {
        "id": 5,
        "content": "Let's say 3 PM. Does that work for you?",
        "createdAt": "2023-05-17T10:05:00Z",
        "updatedAt": "2023-05-17T10:05:00Z",
        "chatId": 1,
        "authorId": 2,
    }
]

export { chat, messageList };