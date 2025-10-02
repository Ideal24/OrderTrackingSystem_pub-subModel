using RabbitMQ.Client;
using System.Text;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        var factory = new ConnectionFactory() { HostName = "localhost" };

        // Create async connection
        await using var connection = await factory.CreateConnectionAsync();

        // Use synchronous channel creation (IModel)
       await using var channel = await connection.CreateChannelAsync();

        // Declare queue
        await channel.QueueDeclareAsync(
            queue: "hello",
            durable: false,
            exclusive: false,
            autoDelete: false,
            arguments: null
        );

        // Message
        var message = "Hello RabbitMQ!";
        var body = Encoding.UTF8.GetBytes(message);

        // Publish message (no properties)
        await channel.BasicPublishAsync(
            exchange: "",
            routingKey: "hello",
            body: body
        );

        Console.WriteLine(" [x] Sent {0}", message);
    }
}
