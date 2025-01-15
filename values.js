export default

{
    APP_ID: "1326348849295527987",
    COMMANDS: [
        {
          name: 'ping',
          description: 'Replies with Pong!',
        },
        {
            name: 'pergunte',
            description: 'Pergunte qualquer coisa, que vou responder, porque eu sei de tudo!',
            options: [
                {
                    name: 'pergunta',
                    description: 'Faça uma pergunta',
                    type: 3,
                    required: true,
                },
            ],
        },
        {
            name: 'traduza',
            description: 'Traduz uma mensagem para o português',
            options: [
                {
                    name: 'mensagem',
                    description: 'Digite a mensagem que deseja traduzir',
                    type: 3,
                    required: true,
                },
            ],
        }
    ]
}