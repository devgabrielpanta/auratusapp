# auratusapp
client: React + Material UI.
server: Express + MySql.

# About
- Single Page Application - sistema de reservas que será utilizado pela recepção de 1 restaurante como teste em outubro e replicado para outro restaurante em novembro.
- A primeira versão atenderá as necessidades serve para atender as necessidades da recepção e da Auratus.

# Personas:
- Recepção: pessoa que está no restaurante gerindo as reservas, recebendo as ligações.
- Guest: cliente do restaurante que vai comer na mesa (não é delivery nem takeaway), pode ter feito uma reserva ou simplesmente ter aparecido no horário pretendido.
- Marketeer: equipa da Auratus que precisa ter acesso aos dados de reserva e enviar eventos de conversão para o Google Ads, Google Analytics e Meta Ads.

# Recepção Stories (prioridade 0)
- Quando a recepção receber uma chamada de telefone, ela tem que ver quando há disponibilidade e adiconar uma nova reserva.
- Quando alguém que fez uma reserva chegar no restaurante, a recepção tem que visualizar qual mesa está próxima de terminar para receber o guest.
- Quando a recepção sentar o guest em uma mesa, ela tem que riscar essa reserva da agenda para saber que já foi alocada.
- Quando alguém que NÃO fez uma reserva chegar no restaurante, a recepção tem que avaliar se haverá a possibilidade de encaixe e adicionar o nome da pessoa em uma fila de espera (criar uma reserva de encaixe).
- A recepção precisa visualizar na lista de espera quem tem reserva ou não para dar prioridade as pessoas que fizeram reserva.
- A recepção precisa visualizar quando alguém fez uma reserva e não chegou dentro do limite de 15 minutos do horário reservado para liberar o horário e encaixar outros guests.
- A recepção precisa visualizar as reservas por serviço (almoço/janta).
- A recepção precisa visualizar as reservas por dia, semana e mês.

# Marketeer Guests (prioridade 1)
- Obter um relatório de reservas com o telefone da pessoa que reservou (obrigatório) e o email (opcional).
- Enviar um evento de conversão para o Google Ads, Google Analytics e Meta Ads quando uma nova reserva for adicionada.
- Vincular o ID de chamadas do VoipStudio com a reserva que foi adicionada.
- Distinguir as reservas que foram feitas por ligação ou encaixe.
- Distinguir a origem da reserva (maps, site, social).

# Currently working:

# BookingsTable: estrutura da tabela que recebe os dados a serem processados.
![image](https://github.com/user-attachments/assets/d5405b4a-9a3a-4715-bd1d-6dc6c9dd4fee)


# AddBookings: drawer para adicionar, atualizar ou cancelar uma nova reserva.
![image](https://github.com/user-attachments/assets/32485c07-dba7-42e2-a370-1d2a366d8771)

