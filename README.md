# Auratus App - Booking Reservation System
A single-page application created to help a digital marketing agency deliver a better experience for its customers, with a booking reservation system that enhances data intelligence for restaurant owners.

client: React + Material UI.
backend: Express
database: MySql.
Host: vercel.

# Releases:
Production:
V1.1 - Bookings Table, Drawer for adding/modifying reservations, authentication process.
Planning:
V1.2 - (Reception) Reservation management
V1.2.1 - Authentication
V1.2.2 - Settings
V1.2.3 - Leads
V1.2.4 - Add reservations
V1.2.5 - Modify reservations
V1.2.6 - Bookings Table
V1.3 - (Host) Reservation control
V1.3.1 - Kanban
V1.3.2 - Wait List
V1.3.3 - Calendar
V1.4 - (Manager) Reservation management
V1.4.1 - Dashboard

# Problems:
- To measure the number of people in a phone reservation, it's necessary to listen to calls on VoIPstudio, which sometimes aren't recorded properly.
- Digital platforms don't receive reservation data and can't optimize campaigns.
- The person in charge of the restaurant can't validate the return on their investments.

# Solutions:
- It is possible to extract a report from the database with the phone number assigned to a reservation and the number of people.
- A manual conversion event is sent to digital platforms based on the reports.
- A periodic manual report is provided with the volume of reservations and the source of the calls.

# User Stories #

# 1. Host
# 1.1 Plan services based on the reservation list
1.1.1 As a host, I want to know how many people are scheduled per service on a given day so I can organize the team.
1.1.2 As a host, I want to know how many people we will serve during the week so I can manage inventory.
1.1.3 As a host, I want to know how many people we are serving in the month so I can manage workforce allocation.

# 1.2 Manage services for people with reservations
1.2.1 As a host, I need to know how many people we are about to serve so I can free up tables.
1.2.2 As a host, I need to verify if someone has a reservation so I can prioritize those who planned ahead.
1.2.3 As a host, I need to filter the reservation list so I can only view ongoing or upcoming services.

# 1.3 Manage services for people without reservations
1.3.1 As a host, I need to view the volume of reservations per service so I can estimate wait times.
1.3.2 As a host, I need to add someone to the waitlist so I can allocate a table when one becomes available.
1.3.3 As a host, I need to view the waitlist so I can inform how many people are ahead.

# 2. Receptionist
# 2.1 Add new reservations
2.1.1 As a receptionist, I need to view the number of reservations per service on a specific day so I can assess whether additional reservations are possible.
2.1.2 As a receptionist, I need to view the number of reservations per service on other days so I can suggest alternative dates if the requested one is unavailable.
2.1.3 As a receptionist, I need to check if the client is already registered so I can associate a contact with the reservation.
2.1.4 As a receptionist, I need to add notes to reservations so the host can ensure excellent service.
2.1.5 As a receptionist, I need to review the reservation details with the client to avoid errors.

# 2.2 Modify existing reservations
2.2.1 As a receptionist, I need to search reservations by name or phone number so I can make changes.
2.2.2 As a receptionist, I need to edit the number of people, date, and/or time of a reservation to accommodate client requests.
2.2.3 As a receptionist, I need to mark a reservation as confirmed to free up the schedule if the person won’t attend.
2.2.4 As a receptionist, I need to cancel a reservation in case the person decides not to go.
2.2.5 As a receptionist, I need to confirm the previous reservation details and edited fields to ensure the changes are correct.

# 3. Manager
# 3.1 Business rules
3.1.1 As a manager, I need to define the types of services so the host can access relevant information.
3.1.2 As a manager, I need to set the service schedules to establish necessary time blocks.
3.1.3 As a manager, I need to define the capacity per hour to prevent restaurant overcrowding.
3.1.4 As a manager, I need to decide whether to accept reservations above capacity to account for potential cancellations.
3.1.5 As a manager, I need to establish the lead time required for reservations so the staff has enough preparation time.

# 3.2 Client list
3.2.1 As a manager, I need to view a client list to gain insights into demand.
3.2.2 As a manager, I need to see the number of reservations per client so I can identify the most important ones.

# 3.3 Reports
3.3.1 As a manager, I need to view the occupancy rate to assess the overall restaurant performance.
3.3.2 As a manager, I need to see the number of people per service to evaluate the most significant ones.
3.3.3 As a manager, I need to view the number of people per day of the week to identify the busiest days.
3.3.4 As a manager, I need to view the average service execution time to assess staff efficiency.
3.3.5 As a manager, I need to view client recurrence to evaluate customer satisfaction levels.

# Features:
- Calendar, Kanban, Add bokings, Edit boookings, Wait list, Settings, Leads, Dashboard.
