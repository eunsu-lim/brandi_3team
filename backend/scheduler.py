import schedule
import time

import pymysql

from connection import get_connection
from model      import OrderDao

class Scheduler():
    def update_status(self):
        """
        배송완료된 주문들을 10분 후 구매확정으로 상태를 변경합니다. 
        Args:
            N/A
        Returns:
            N/A
        Authors:
            jisunn0130@gmail.com(최지선)
        History:
            2020.11.03(최지선) : 초기 생성
            2020.11.06(최지선) : select 쿼리 추가
        """
    
        try:
            db_connection = get_connection()
            with db_connection.cursor() as cursor:
                #10분 전에 배송완료가 된 주문들 조회하는 쿼리
                select_query = """
                SELECT orders.id, detailed_order_number
                FROM orders 
                LEFT JOIN order_status_history
                ON orders.id = order_status_history.order_id
                WHERE order_status_history.order_status_id = 4
                AND order_status_history.updated_at < SUBDATE(NOW(), INTERVAL 10 MINUTE)
                """
                cursor.execute(select_query)
            
                for order in cursor.fetchall():
                    query = """
                    UPDATE orders
                    LEFT JOIN order_status_history 
                    ON orders.id = order_status_history.order_id
                    SET orders.order_status_id = 5
                    WHERE order_status_history.order_status_id = 4
                    AND orders.id = %(id)s
                    AND order_status_history.updated_at < SUBDATE(NOW(), INTERVAL 10 MINUTE)
                    """
                    cursor.execute(query, order)
                    order_history_info = {
                        'order_status_id' : 5,
                        'order_id' : order['id'],
                        'account_id' : 1
                    }
                    order_history = OrderDao().insert_order_history(db_connection, order_history_info)
                    if order_history:
                        db_connection.commit()
                        print(order['detailed_order_number'], "번 주문이 구매확정 되었습니다.")
                    else:
                        db_connection.rollback()
        finally:
            db_connection.close()

    def schedule_a_job(self, type="Mins", interval=1):

        if (type == "Mins"):
            schedule.every(interval).minutes.do(self.update_status)

        while True:
            schedule.run_pending()
            time.sleep(1)

if __name__ == "__main__":
    run = Scheduler()
    run.schedule_a_job()