const mockData = {
              data: {
                data: {
                  _id: '65bc7b61204919eb7b8d4103',
                  type: "Survey",
                  title: "Malum hamko tumhe",
                  desc: "Kis bat ka intte jar hai",
                  questions: [
                    {
                      type: "",
                      question: "",
                      options: []
                    },
                    {
                      type: "single",
                      question: "Ka ho na pyarr hai",
                      options: []
                    },
          
                    {
                      type: "radio",
                      question: "Kaha na ptya hai",
                      options: ["gertg", "xrdget"]
                    },
                    {
                      type: "checkbox",
                      question: "sddfetgf",
                      options: ["dgdt", "sgrthr"]
                    },
                    {
                      type: "single",
                      question: "sdfgt",
                      options: []
                    }
                  ],
                  stage: "published",
                  status: "Answered"
                }
              }
}

export default {
    get: jest.fn().mockResolvedValue(mockData)
}