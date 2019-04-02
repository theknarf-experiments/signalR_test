using Microsoft.AspNetCore.SignalR;

namespace SignalR.Hubs
{
    public class PingPongHub : Hub
    {
        public string Ping()
        {
            return "Pong!";
        }
    }
}