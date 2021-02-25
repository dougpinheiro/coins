FROM logstash:7.10.1
WORKDIR /app
COPY pipeline/logstash-coin.conf ./conf/
EXPOSE 9600:9600
EXPOSE 8089:8089
WORKDIR /bin
ENTRYPOINT ["logstash", "-f", "/app/conf/logstash-coin.conf"]