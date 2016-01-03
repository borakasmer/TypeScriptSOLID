using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public interface ILogger
    {
        string WriteLog();
    }
    public class XmlLog : ILogger
    {
        public string WriteLog()
        {
            return "Xml Log Written!" + DateTime.Now.ToString();
        }
    }
    public class MsSqlLog : ILogger
    {
        public string WriteLog()
        {
            return "MsSql Log Written!" + DateTime.Now.ToString();
        }
    }
    public class MongoDbLog : ILogger
    {
        public string WriteLog()
        {
            return "MongoDb Log Written!" + DateTime.Now.ToString();
        }
    }

    public class LogProcess
    {
        public ILogger logProcess;
        LogProcess(ILogger logPrc)
        {
            logProcess = logPrc;
        }
        public string LogUser()
        {
            return logProcess.WriteLog();
        }
    }
    
}
