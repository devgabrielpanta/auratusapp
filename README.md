﻿# auratusapp
client: React + Material UI.
server: Express + MySql.

# Issues
- Array com Lista de Reservas vazia: Quando o client faz o request da lista de reservas com a função 'getBookings', não está armazenando o json e retorna uma array vazia na variável 'data'. Quando eu faço esse request pelo Insomnia, ele obtém uma array com um JSON das reservas, entretanto não consegui arrumar isso no React.

- Map da Lista de Reservas: já vi que está com algum problema na hora de mapear a array dentro do DataGrid no componente 'RenderedTable', mas primeiro estou tentando resolver o erro anterior para depois lidar com isso.

- Servidor caindo: não consegui deixar o servidor ativo, toda hora aparece algum erro e ele cai. Aparentemente é algum problema de conexão entre o Mysql e o express. Eu removi o StrictMode do React e isso resolveu o problema de requisições em duplicidade que derrubavam o servidor.


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

# React componentes
- BookingsHeader: nav menu com o título da página.
- BookingsTable (parent): estrutura da tabela que recebe os dados a serem processados.
- RenderedTable (children): renderização condicional do DataGrid (Material UI) com os dados recebidos. Se o app está 'loading', é renderizado  o loadingOverlay, caso contrário é  renderizado o DataGrid.
- LoadingOverlay: sobrepõe o DataGrid com um spinning de loading.
- AddBooking: drawer para adicionar uma nova reserva.

# Qual é o pipeline de desenvolvimento
![image](https://github.com/user-attachments/assets/a756e3da-b066-44e9-8752-66d3d8ecaab8)
- AddBooking: transformar em um OffCanva que aparece ao clicar em um widget flutuante, com a opção de adicionar, atualizar ou remover uma reserva.
- BookingsManagement: componente pai que vai renderizar condicionalmente o BookingsList, BookingsFilter e o BookingsViews.
- BookingsList: visualização em lista das reservas para a recepção, distinguindo quais já estão servindo, quem está em espera e as reservas que estão para chegar.
- BookingsFilter: filtrar/organizar por período (hoje, amanhã, essa semana, esse mês), data, tipo de reserva (reserva, encaixe), status de reserva (reservado, encaixe, noshown, esperando, servindo, finalizada, cancelado) e serviço (almoço/janta). Barra de pesquisa para localizar uma reserva pelo nome ou telemovel do guest.
- BookingsViews: renderização condicional da visualização da lista de reservas como CalendarView, WeekView, DailyView.
- DailyView: visualização em tabela das reservas para o dia de hoje, distinguindo o serviço (almoço/janta), checkbox para marcar como servindo e apresentar a reserva risca, alerta de noshown para confirmar e riscar a reserva com uma cor diferente.
- WeekView: visualização semanal da lista de reservas separando por almoço/janta, com a possibilidade de expandir o dia ao carregar a visualização DailyView.
- CalendarView: calendário do mês atual destacando o dia de hoje, cada dia apresenta a quantidade de reservas que tem para o almoço e para a janta, ao clicar no dia aparece um botão para abrir os detalhes, essa ação carrega a DailyView.

- BookingsList:
- ![image](https://github.com/user-attachments/assets/43e4c084-6ac9-4ee7-b587-fe8530cf0710)

![image](https://github.com/user-attachments/assets/4de63174-bd6e-432a-ae6a-f652d3a34e80)

