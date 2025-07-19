export const GetLatestPodTaskQuery = ({tenantId}) => {
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
                            "name": "podUsedCreditTask"
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