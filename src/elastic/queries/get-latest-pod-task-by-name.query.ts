export const GetLatestPodTaskByNameQuery = ({tenantId,name}) => {
    return {
        "sort": [
            {
                "timestamp": {
                    "order": "desc"
                }
            }
        ],
        "size": 1,
        "query": {
            "bool": {
                "must": [
                    {
                        "match_phrase": {
                            "type": "RESULT"
                        }
                    },
                    {
                        "match_phrase": {
                            "name": name
                        }
                    },
                    {
                        "match_phrase": {
                            "tenantId": tenantId
                        }
                    }
                ]
            }
        }
    }
}