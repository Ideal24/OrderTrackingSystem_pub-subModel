using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

var factory = new ConnectionFactory() { HostName = "localhost" };

// Await the async connection
await using var connection = await factory.CreateConnectionAsync();

// Create async channel
await using var channel = await connection.CreateChannelAsync();

// Declare queue (async)
await channel.QueueDeclareAsync("hello", false, false, false, null);

var consumer = new AsyncEventingBasicConsumer(channel);

consumer.ReceivedAsync += (model, ea) =>
{
    var body = ea.Body.ToArray();
    var message = Encoding.UTF8.GetString(body);
    Console.WriteLine(" [x] Received {0}", message);
    return Task.CompletedTask;
};

// Start consuming (async)
await channel.BasicConsumeAsync("hello", true, consumer);

Console.WriteLine(" Press [enter] to exit.");
Console.ReadLine();