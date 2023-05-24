<!--- These are examples. See https://shields.io for others or to customize this set of shields. You might want to include dependencies, project status and license info here --->
[![Netlify Status](https://api.netlify.com/api/v1/badges/dc71061d-ad45-42b0-9e3f-5dc1d4eea09f/deploy-status)](https://app.netlify.com/sites/pwitw/deploys)
<a href="http://www.wtfpl.net/"><img
       src="http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-badge-4.png"
       width="80" height="15" alt="WTFPL" /></a>
![Node Version](https://img.shields.io/node/v/canary)

![GitHub repo size](https://img.shields.io/github/repo-size/kiel-h-byrne/pwitw)
![Github code size](https://img.shields.io/github/languages/code-size/kiel-h-byrne/pwitw)
![Github Languages](https://img.shields.io/github/languages/count/kiel-h-byrne/pwitw)
![Github Top Language](https://img.shields.io/github/languages/top/kiel-h-byrne/pwitw)

![GitHub Issues](https://img.shields.io/github/issues-raw/kiel-h-byrne/pwitw)
![GitHub contributors](https://img.shields.io/github/contributors/kiel-h-byrne/pwitw)
![Github Last Commit](https://img.shields.io/github/last-commit/kiel-h-byrne/pwitw)
<!--

![Github Commit Activity](https://img.shields.io/github/commit-activity/m/kiel-h-byrne/pwitw)
![GitHub stars](https://img.shields.io/github/stars/kiel-h-byrne/pwitw?style=social)
![GitHub forks](https://img.shields.io/github/forks/kiel-h-byrne/pwitw?style=social)
![Github Manifest Version](https://img.shields.io/github/manifest-json/v/kiel-h-byrne/pwitw)

-->

# P+WITW (Where In The World?)
This is intended as an asset management dashboard, with a location-centric focus. 
_When a computer signs onto any network and obtains an IP address, the public IP address is obtained, a geolocation calculated, and stored along with other machine information in a database._

<img width="80%" src="https://github.com/Kiel-H-Byrne/pwitw/assets/955269/08744bb9-74cb-40ab-8ff8-e1e51fdd60d8" />

---

### How The Script Works:
- The script is written in Powershell, this does the heavy lifting.
- A Scheduled task will run the script when a network change is detected on the host.
- The script is being deployed on host machines using the existing PW_Logon scripts--specifically the per-office scripts that map network drives. 
- An accompanying bash script ('installTask.bat) copies the necessary files to local folder ['C:\Temp\PWITW'](C:\Temp\PWITW) and installs a scheduled task (an accompanying 'SubmitPCInfo.xml' file).
- When a network change is detected, the local copy of the PS script is run. A copy of the information (formatted in JSON) is saved in the same folder before sending to the database. [PCInfo.json](C:\temp\pwitw\pcinfo.json). 

### How The Application Works:
- The application repository is stored on [github.com](https://github.com/tdotholla/pwitw).
    - `clone https://github.com/tdotholla/pwitw`
- The codebase is written primarily in Javascript/JSX (React) and Node.js with multiple useful NPM packages.
    - A node.js server can build and serve website using Yarn/NPM to install necessary packages. T
    - `yarn | yarn start `
- A DC Server is currently hosting the application: ['WDCWK1700:3000'](http://WDCWK1700:3000)
- The database is hosted on [restdb.io](restdb.io)
- The IP Geolocation API uses ipstack.io (it was ipinfo.io but ran into rate limits)
- The Maps API is Google Maps (would like to use Mapbox in future)


### FEATURES:
- A Map of Markers, grouped into clusters of two types:
    - LAN Clusters: Those workstations whose local IPs are within the PW Subnet of 10.[100-254].X.X
    - WAN Clusters: Those workstations whose local IPs are outside of the above scope, and known public subnets. (192.168.X.X, 10.10.X.X, etc.)
- A Section of charts:
    - Network Graph - [Inner Pie] Percentage of devices within LAN. [Outer Pie] Counts grouped by network activity.
    - Build Graph - Count of devices on each build version.
- A Table: Searchable pivot table
    - Fuzzy search using any text (computer name, build, application, etc...)
    - Sort by clicking the header of any column.
    - Download the filtered results as CSV file with the "Download" button.
    - Hide/Show columns with the "Columns" Button.

#### In Development:
- Uptime Graph - Counts grouped by uptime duration. (undeveloped)

#### CAVEATS:
- At this time, to preserve database size, we only want the last known location instead of a set of locations over time (can form a story of when/where a machine has been).
    - Information is pulled once per minute, so as not to go over rate limits.
- We do not store usernames for GDPR Compliance.
- Written in Powershell; for the windows environment. 
